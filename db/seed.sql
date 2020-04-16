INSERT INTO departments
    (department_name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Safety and Risk Commitee'),
    ('Management');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('VP of Human Resources', 150000, 1),
    ('Marketing Manager', 120000, 2),
    ('Risk Analyst', 125000, 3),
    ('Company Director', 250000, 4)


INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Blanche', 'Devereaux', 1, NULL),
    ('Rose', 'Nylund', 2, NULL),
    ('Dorothy', 'Zbornak', 3, NULL),
    ('Sophia', 'Petrillo', 4, NULL)