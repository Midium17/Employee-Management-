from sqlalchemy import Column, Integer, Date, String

from .database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        String(50),
        unique=True,
        index=True,
        nullable=False
    )

    first_name = Column(
        String(100),
        nullable=False
    )

    last_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )

    phone = Column(
        String(30),
        nullable=True
    )

    department = Column(
        String(100),
        nullable=True
    )

    job_title = Column(
        String(100),
        nullable=True
    )

    status = Column(
        String(30),
        default="Active"
    )

    hire_date = Column(Date, nullable=True)