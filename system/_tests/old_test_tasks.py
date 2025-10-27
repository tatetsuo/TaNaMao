from fastapi.testclient import TestClient

def test_create_task(client):
    task_data = {"title": "Estudar FastAPI"}
    
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == task_data["title"]
    assert data["completed"] is False
    assert "id" in data
    
def test_get_tasks(client):
    task_data = {"title": "Estudar FastAPI"}
    client.post("/tasks/", json=task_data)
    
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0