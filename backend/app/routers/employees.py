
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Employee
from ..schemas import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate,
)

router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"],
)

@router.get("/", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).order_by(Employee.id).all()

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    employee = db.get(Employee, employee_id)

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    return employee

@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db),
):
    employee = Employee(**employee_data.model_dump())

    try:
        db.add(employee)
        db.commit()
        db.refresh(employee)
        return employee

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee ID or email already exists",
        )

@router.patch("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db),
):
    employee = db.get(Employee, employee_id)

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    update_data = employee_data.model_dump(exclude_unset=True)

    # Required database fields must not be set to null.
    for field in ("first_name", "last_name", "email", "status"):
        if field in update_data and update_data[field] is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"{field} cannot be null",
            )

    for field, value in update_data.items():
        setattr(employee, field, value)

    try:
        db.commit()
        db.refresh(employee)
        return employee

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or another unique value already exists",
        )

@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    employee = db.get(Employee, employee_id)

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    db.delete(employee)
    db.commit()

    return None