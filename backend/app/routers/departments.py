from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Department, Employee
from ..schemas import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentResponse,
)


router = APIRouter(
    prefix="/api/departments",
    tags=["Departments"],
)


@router.get("/", response_model=list[DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    return (
        db.query(Department)
        .order_by(Department.name)
        .all()
    )


@router.get("/{department_id}", response_model=DepartmentResponse)
def get_department(
    department_id: int,
    db: Session = Depends(get_db),
):
    department = (
        db.query(Department)
        .filter(Department.id == department_id)
        .first()
    )

    if department is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found",
        )

    return department


@router.post(
    "/",
    response_model=DepartmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_department(
    department_data: DepartmentCreate,
    db: Session = Depends(get_db),
):
    existing = (
        db.query(Department)
        .filter(
            Department.name == department_data.name.strip()
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A department with this name already exists",
        )

    department = Department(
        name=department_data.name.strip(),
        description=department_data.description,
    )

    db.add(department)

    try:
        db.commit()
        db.refresh(department)
    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A department with this name already exists",
        )

    return department


@router.patch(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def update_department(
    department_id: int,
    department_data: DepartmentUpdate,
    db: Session = Depends(get_db),
):
    department = (
        db.query(Department)
        .filter(Department.id == department_id)
        .first()
    )

    if department is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found",
        )

    changes = department_data.model_dump(exclude_unset=True)

    if "name" in changes and changes["name"] is not None:
        changes["name"] = changes["name"].strip()

        if not changes["name"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Department name cannot be empty",
            )

        existing = (
            db.query(Department)
            .filter(
                Department.name == changes["name"],
                Department.id != department_id,
            )
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A department with this name already exists",
            )

    for field, value in changes.items():
        setattr(department, field, value)

    try:
        db.commit()
        db.refresh(department)
    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Could not update the department",
        )

    return department


@router.delete(
    "/{department_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_department(
    department_id: int,
    db: Session = Depends(get_db),
):
    department = (
        db.query(Department)
        .filter(Department.id == department_id)
        .first()
    )

    if department is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found",
        )

    employees_count = (
        db.query(Employee)
        .filter(Employee.department_id == department_id)
        .count()
    )

    if employees_count > 0:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "This department has employees assigned to it. "
                "Reassign those employees before deleting it."
            ),
        )

    db.delete(department)
    db.commit()