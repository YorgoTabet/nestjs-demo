## Description

This project is for trying out [NestJS](https://nestjs.com/).

Please note this was created on a windows PC, while running on WSL2. Keep that in mind if you run into any issues.

### Prerequisites

This demo assumes you've already setup your development environment following the prisma demo repo (node, npm, etc). You will need at least Node 20+ to run this project.

One additional requirement is the NestJS CLI. If you don't have it installed, you can do so via npm:

```bash
npm install -g @nestjs/cli
```

### Up and Running

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run start:dev
```

Access the application at `http://localhost:3000`.

### Commands you might find useful

Generate a new module:

```bash
nest generate module some-module-name
nest generate service some-module-name
nest generate controller some-module-name
```

### How to submit your work

1. Fork this repo to your own GitHub account.
2. Make your changes there.
3. Open a Pull Request against this repo.

### What you need to do

1. Complete the books module (CRUD operations).
2. Support a publishers module (a book has a single publisher).
3. Support a genres module (a book can have multiple genres). **NOTE:** be careful how you handle this to avoid duplicating data - you only want to store either books inside genres, or genres inside books, not both. **NOTE Number 2:** this isn't ideal and you wouldn't have to do this with a real database, this is just for the purpose of this demo.

**Bonus Points:** add a query param to the books GET endpoint called `includeAuthor` which when set to true will include the author details in the response. So a request to `/books?includeAuthor=true` would return something like:

```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": {
      "id": 1,
      "name": "Author Name"
    }
  }
]
```

Hint: you'll need to make use of the `@Query` decorator, I've already injected the AuthorsService into the BooksService for you to make this easier.

**Extra Bonus Points:** use [pipes](https://docs.nestjs.com/pipes) to validate id params as integers
**More Extra Bonus Points:** add swagger to your endpoints - see [here](https://docs.nestjs.com/openapi/introduction) for more info

### A note on using AI agents

This exercise is meant to deepen your understanding of NestJS, modules, dependency injection, and building REST APIs. If you plan to use an AI agent, don't ask it to generate the full solution. Instead, guide it with something like:

```
Act as a mentor. Do not give me the full solution.
Help me step by step with hints, explanations, and guiding questions so I can implement:
- The books module with full CRUD operations
- The publishers module and its one-to-many relationship to books
- The genres module and its many-to-many relationship to books
- (Bonus) The `includeAuthor` query param on the books GET endpoint
- (Bonus) Pipes to validate id params as integers
- (Bonus) Swagger documentation on the endpoints

Focus on helping me understand, not completing the task for me.
```

The goal is to understand what you're doing, not just finish the assignment.
