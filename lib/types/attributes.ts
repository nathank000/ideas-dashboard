export type AttributeType = "text" | "longtext" | "number" | "boolean";

export interface AttributeDefinition {
  id: string;
  name: string;
  type: AttributeType;
}

export interface AttributeProfile {
  id: string;
  name: string;
  attributes: AttributeDefinition[];
}

export interface AttributeValue {
  definitionId: string;
  value: string | number | boolean;
}