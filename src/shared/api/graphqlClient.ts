import { getGraphQLApiUrl } from "@/shared/config/env";

type GraphQLVariables = Record<string, unknown>;

type GraphQLErrorLocation = {
  line: number;
  column: number;
};

export type GraphQLResponseError = {
  message: string;
  locations?: GraphQLErrorLocation[];
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLResponseError[];
  extensions?: Record<string, unknown>;
};

type GraphQLRequestOptions<TVariables extends GraphQLVariables> = {
  query: string;
  operationName?: string;
  variables?: TVariables;
  signal?: AbortSignal;
};

export class GraphQLClientError extends Error {
  readonly errors: GraphQLResponseError[];

  readonly status: number;

  constructor(errors: GraphQLResponseError[], status: number) {
    super(errors.map((error) => error.message).join("\n"));

    this.name = "GraphQLClientError";

    this.errors = errors;
    this.status = status;
  }
}

async function readGraphQLResponse<TData>(
  response: Response,
): Promise<GraphQLResponse<TData>> {
  try {
    return (await response.json()) as GraphQLResponse<TData>;
  } catch {
    throw new Error(
      "El servidor GraphQL no ha devuelto una respuesta JSON válida.",
    );
  }
}

export async function requestGraphQL<
  TData,
  TVariables extends GraphQLVariables = GraphQLVariables,
>({
  query,
  operationName,
  variables,
  signal,
}: GraphQLRequestOptions<TVariables>): Promise<TData> {
  const response = await fetch(getGraphQLApiUrl(), {
    method: "POST",
    headers: {
      Accept: "application/graphql-response+json, application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      operationName,
      variables,
    }),
    signal,
  });

  const result = await readGraphQLResponse<TData>(response);

  if (result.errors !== undefined && result.errors.length > 0) {
    throw new GraphQLClientError(result.errors, response.status);
  }

  if (!response.ok) {
    throw new Error(
      `La petición GraphQL ha fallado con estado HTTP ${response.status}.`,
    );
  }

  if (result.data === undefined) {
    throw new Error("La respuesta GraphQL no contiene datos.");
  }

  return result.data;
}
