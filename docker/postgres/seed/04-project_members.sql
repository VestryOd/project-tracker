-- Пример заполнения project_members для 5 команд по 6 человек (всего 30 пользователей)
-- Для реального наполнения лучше использовать конкретные id из users, projects, roles
-- Здесь используется генерация id через gen_random_uuid(), а project_id, user_id, role_id выбираются случайно

INSERT INTO project_members (id, project_id, user_id, role_id)
SELECT gen_random_uuid(), p.id, u.id, r.id
FROM (
  SELECT id FROM projects LIMIT 10
) p
CROSS JOIN LATERAL (
  SELECT id FROM users ORDER BY random() LIMIT 6
) u
CROSS JOIN LATERAL (
  SELECT id FROM roles ORDER BY random() LIMIT 1
) r
LIMIT 30; 