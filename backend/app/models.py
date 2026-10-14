from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .database import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        unique=True,
        index=True,
        nullable=False,
    )

    description = Column(String(500), nullable=True)

    # One department can have many employees.
    employees = relationship(
        "Employee",
        back_populates="department",
    )


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    phone = Column(String(30), nullable=True)

    # A foreign key pointing to departments.id.
    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=True,
        index=True,
    )

    job_title = Column(String(100), nullable=True)

    status = Column(
        String(20),
        nullable=False,
        default="Active",
    )

    hire_date = Column(Date, nullable=True)

    # Each employee belongs to zero or one department.
    department = relationship(
        "Department",
        back_populates="employees",
    )