
from typing import Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)

EmployeeStatus = Literal["Active", "Inactive"]

class EmployeeBase(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    department: str | None = Field(default=None, max_length=100)
    job_title: str | None = Field(default=None, max_length=100)
    status: EmployeeStatus = "Active"

class EmployeeCreate(EmployeeBase):
    employee_id: str = Field(min_length=1, max_length=50)

class EmployeeUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    last_name: str | None = Field(default=None, min_length=1, max_length=100)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=30)
    department: str | None = Field(default=None, max_length=100)
    job_title: str | None = Field(default=None, max_length=100)
    status: EmployeeStatus | None = None

class EmployeeResponse(EmployeeBase):
    id: int
    employee_id: str

    model_config = ConfigDict(from_attributes=True)