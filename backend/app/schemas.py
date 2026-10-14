from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# -----------------------------
# Department schemas
# -----------------------------

class DepartmentBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: str | None = Field(
        default=None,
        max_length=500,
    )


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )


class DepartmentResponse(DepartmentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# A small representation of a department embedded
# in an employee response.
class DepartmentSummary(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# Employee schemas
# -----------------------------

class EmployeeBase(BaseModel):
    employee_id: str = Field(min_length=1, max_length=50)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr

    phone: str | None = None
    department_id: int | None = None
    job_title: str | None = None

    status: Literal["Active", "Inactive"] = "Active"
    hire_date: date | None = None


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    employee_id: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )

    first_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    last_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    email: EmailStr | None = None
    phone: str | None = None
    department_id: int | None = None
    job_title: str | None = None

    status: Literal["Active", "Inactive"] | None = None
    hire_date: date | None = None


class EmployeeResponse(EmployeeBase):
    id: int

    department: DepartmentSummary | None = None

    model_config = ConfigDict(from_attributes=True)