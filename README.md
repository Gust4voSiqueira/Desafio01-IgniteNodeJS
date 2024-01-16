
# Desafio 01 - Nodejs 💻

Este é o primeiro desafio da trilha de NodeJs do [Ignite](https://www.rocketseat.com.br/formacao/node) (Bootcamp da Rocketseat).

O desafio consiste em desenvolver um CRUD simples para um gerenciador de tarefas. As rotas da API são:
- `POST - /tasks`
    É possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente.
    
- `GET - /tasks`
    
    É possível listar todas as tasks salvas no banco de dados.
    
    Também é possível realizar uma busca, filtrando as tasks pelo `title` e `description`
    
- `PUT - /tasks/:id`
    
    É possível atualizar uma task pelo `id`.
    
    No `body` da requisição, espera-se somente o `title` e/ou `description` para serem atualizados.
    
    Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
    
    Antes de realizar a atualização, é realizada uma validação se o `id` pertence a uma task salva no banco de dados.
    
- `DELETE - /tasks/:id`
    
    É possível remover uma task pelo `id`.
    
    Antes de realizar a remoção, é realizada uma validação se o `id` pertence a uma task salva no banco de dados.
    
- `PATCH - /tasks/:id/complete`
    
    É possível marcar a task como completa.

    Antes da alteração, é realizada uma validação se o `id` pertence a uma task salva no banco de dados.