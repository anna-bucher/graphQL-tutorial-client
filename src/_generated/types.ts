/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getLinksQuery {
  feed:  {
    __typename: "Feed",
    links:  Array< {
      __typename: "Link",
      id: string,
      createdAt: string,
      url: string,
      description: string,
    } >,
  },
};

export interface createLinkMutationVariables {
  description: string,
  url: string,
};

export interface createLinkMutation {
  createLink:  {
    __typename: "Link",
    id: string,
    createdAt: string,
    url: string,
    description: string,
  },
};

export interface signupMutationVariables {
  email: string,
  password: string,
  name: string,
};

export interface signupMutation {
  signup:  {
    __typename: "AuthPayload",
    token: string | null,
  } | null,
};

export interface loginMutationVariables {
  email: string,
  password: string,
};

export interface loginMutation {
  login:  {
    __typename: "AuthPayload",
    token: string | null,
  } | null,
};
