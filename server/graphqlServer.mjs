import { GraphQLError } from "graphql";
import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const GRAPHQL_REQUEST_DELAY = 700;

const projects = [
  {
    id: "website-redesign",
    name: "Rediseño web",
    description:
      "Actualización de la web corporativa y mejora de la experiencia de usuario.",
    status: "ACTIVE",
    progress: 72,
    dueDate: "15 de agosto",
    members: 4,
    team: [
      {
        id: "member-1",
        name: "Laura Gómez",
        role: "Diseño UX",
      },
      {
        id: "member-2",
        name: "Daniel Ruiz",
        role: "Frontend",
      },
      {
        id: "member-3",
        name: "Marta León",
        role: "Contenido",
      },
      {
        id: "member-4",
        name: "Pablo Vega",
        role: "Producto",
      },
    ],
  },
  {
    id: "mobile-application",
    name: "Aplicación móvil",
    description:
      "Preparación del prototipo inicial para la aplicación de clientes.",
    status: "PLANNING",
    progress: 24,
    dueDate: "30 de septiembre",
    members: 3,
    team: [
      {
        id: "member-5",
        name: "Nuria Vidal",
        role: "Diseño móvil",
      },
      {
        id: "member-6",
        name: "Álvaro Soto",
        role: "Desarrollo móvil",
      },
      {
        id: "member-7",
        name: "Irene Costa",
        role: "Investigación",
      },
    ],
  },
  {
    id: "internal-dashboard",
    name: "Panel interno",
    description:
      "Centralización de métricas y herramientas para el equipo de operaciones.",
    status: "COMPLETED",
    progress: 100,
    dueDate: "20 de junio",
    members: 5,
    team: [
      {
        id: "member-8",
        name: "Sergio Ramos",
        role: "Analítica",
      },
      {
        id: "member-9",
        name: "Clara Molina",
        role: "Backend",
      },
      {
        id: "member-10",
        name: "Hugo Prieto",
        role: "Frontend",
      },
      {
        id: "member-11",
        name: "Elena Pastor",
        role: "Operaciones",
      },
      {
        id: "member-12",
        name: "Raúl Cano",
        role: "Producto",
      },
    ],
  },
];

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    enum ProjectStatus {
      PLANNING
      ACTIVE
      COMPLETED
    }

    type ProjectMember {
      id: ID!
      name: String!
      role: String!
    }

    input AddProjectMemberInput {
      name: String!
      role: String!
    }

    type Project {
      id: ID!
      name: String!
      description: String!
      status: ProjectStatus!
      progress: Int!
      dueDate: String!
      members: Int!
      team: [ProjectMember!]!
    }

    type Query {
      projects: [Project!]!
      project(id: ID!): Project
    }

    type Mutation {
      addProjectMember(
        projectId: ID!
        input: AddProjectMemberInput!
      ): ProjectMember!
    }
  `,
  resolvers: {
    Query: {
      projects: async () => {
        await wait(GRAPHQL_REQUEST_DELAY);

        return projects;
      },

      project: async (_parent, { id }) => {
        await wait(GRAPHQL_REQUEST_DELAY);

        return projects.find((project) => project.id === id) ?? null;
      },
    },

    Mutation: {
      addProjectMember: async (_parent, { projectId, input }) => {
        await wait(GRAPHQL_REQUEST_DELAY);

        const project = projects.find(
          (currentProject) => currentProject.id === projectId,
        );

        if (project === undefined) {
          throw new GraphQLError("No se ha encontrado el proyecto.", {
            extensions: {
              code: "PROJECT_NOT_FOUND",
            },
          });
        }

        const name = input.name.trim();

        const role = input.role.trim();

        if (name === "" || role === "") {
          throw new GraphQLError("El nombre y el rol son obligatorios.", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        const newMember = {
          id: `member-${Date.now()}`,
          name,
          role,
        };

        project.team.push(newMember);

        project.members = project.team.length;

        return newMember;
      },
    },
  },
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Servidor GraphQL disponible en http://localhost:4000/graphql");
});
