
def employee_payload():
    return {
        "employee_id": "EMP001",
        "first_name": "Tendai",
        "last_name": "Moyo",
        "email": "tendai@example.com",
        "phone": "0712345678",
        "department": "IT",
        "job_title": "Network Engineer",
        "status": "Active",
    }

def test_create_employee(client):
    response = client.post(
        "/api/employees/",
        json=employee_payload(),
    )

    assert response.status_code == 201

    data = response.json()
    assert data["employee_id"] == "EMP001"
    assert data["first_name"] == "Tendai"
    assert data["email"] == "tendai@example.com"
    assert "id" in data

def test_list_employees(client):
    client.post("/api/employees/", json=employee_payload())

    response = client.get("/api/employees/")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["employee_id"] == "EMP001"

def test_get_employee(client):
    created = client.post(
        "/api/employees/",
        json=employee_payload(),
    )
    employee_id = created.json()["id"]

    response = client.get(f"/api/employees/{employee_id}")

    assert response.status_code == 200
    assert response.json()["id"] == employee_id

def test_update_employee(client):
    created = client.post(
        "/api/employees/",
        json=employee_payload(),
    )
    employee_id = created.json()["id"]

    response = client.patch(
        f"/api/employees/{employee_id}",
        json={"department": "Cybersecurity"},
    )

    assert response.status_code == 200
    assert response.json()["department"] == "Cybersecurity"
    assert response.json()["first_name"] == "Tendai"

def test_delete_employee(client):
    created = client.post(
        "/api/employees/",
        json=employee_payload(),
    )
    employee_id = created.json()["id"]

    response = client.delete(
        f"/api/employees/{employee_id}"
    )

    assert response.status_code == 204

    response = client.get(
        f"/api/employees/{employee_id}"
    )
    assert response.status_code == 404

def test_duplicate_employee_returns_conflict(client):
    payload = employee_payload()

    first = client.post("/api/employees/", json=payload)
    second = client.post("/api/employees/", json=payload)

    assert first.status_code == 201
    assert second.status_code == 409

def test_invalid_email_is_rejected(client):
    payload = employee_payload()
    payload["email"] = "not-an-email"

    response = client.post("/api/employees/", json=payload)

    assert response.status_code == 422

def test_missing_employee_returns_not_found(client):
    response = client.get("/api/employees/99999")

    assert response.status_code == 404