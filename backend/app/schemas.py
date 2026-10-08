from pydantic import BaseModel, EmailStr, ConfigDict


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    department: str | None = None
    job_title: str | None = None
    status: str = "Active"


class EmployeeCreate(EmployeeBase):
    employee_id: str


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    department: str | None = None
    job_title: str | None = None
    status: str | None = None


class EmployeeResponse(EmployeeBase):
    id: int
    employee_id: str

    model_config = ConfigDict(
        from_attributes=True
    )