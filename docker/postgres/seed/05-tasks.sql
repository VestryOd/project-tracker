-- Пример заполнения 100 задач
-- Для реального наполнения лучше использовать конкретные id из users и projects
-- Здесь используется генерация случайных связей

INSERT INTO tasks (title, description, status, project_id, created_by, assignee_id)
SELECT 
  'Task ' || g, 
  'Описание задачи ' || g, 
  (ARRAY['open','in_progress','review','done'])[floor(random()*4)+1],
  p.id, 
  u1.id, 
  u2.id
FROM generate_series(1,100) as g
CROSS JOIN LATERAL (SELECT id FROM projects ORDER BY random() LIMIT 1) p
CROSS JOIN LATERAL (SELECT id FROM users ORDER BY random() LIMIT 1) u1
CROSS JOIN LATERAL (SELECT id FROM users ORDER BY random() LIMIT 1) u2; 