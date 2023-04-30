import { find, first, forEach, last } from "lodash";

import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import TagDefinition from "../../Common/TagDefinition";
import { GetDefinitions } from "./processObject";

export function SearchDefinitionFromRoot(propertyPath: string) {
  return SearchDefinition(undefined, propertyPath);
}

export function SearchDefinition(
  subDefinitions: ITagDefinition[] | undefined,
  propertyPath: string
): TagDefinition | undefined {
  if (propertyPath.length === 0) {
    return undefined;
  }

  let definition: ITagDefinition | undefined;
  const pathParts = propertyPath.split(".");
  const allDefinitions = GetDefinitions();

  if (subDefinitions) {
    definition = searchInDefinitions(pathParts, definition, subDefinitions);
  }

  // if (!definition) {
  //   forEach(subDefinitions, (subDef) => {
  //     if (definition) {
  //       return;
  //     }
  //     if (subDef.Properties) {
  //       definition = searchInDefinitions(pathParts, subDef, subDef.Properties);
  //     }
  //   });
  // }

  // no nested definition found, get definition of last path property name
  if (!definition) {
    definition = allDefinitions.find(
      (x) => !x.CollectAs && x.Property === last(pathParts)
    );

    if (!definition) {
      const multipleDefinitions = allDefinitions.filter(
        (x) => x.CollectAs === last(pathParts)
      );

      definition = first(multipleDefinitions);

      // multiple defintions with same CollectAs Property, take the most specific
      // TODO: how to make this better? The case is her FAM, FAMS and FAMC
      if (multipleDefinitions.length > 1) {
        definition = find(
          multipleDefinitions,
          (x) => x.CollectAsArray === true
        );
      }
    }
  }

  return definition ? new TagDefinition(definition) : undefined;
}

function searchInDefinitions(
  pathParts: string[],
  definition: ITagDefinition | undefined,
  subDefinitions: ITagDefinition[]
) {
  let breakLoop = false;
  forEach(pathParts, (pathPart, index) => {
    if (breakLoop) {
      return;
    }

    if (index === pathParts.length - 1) {
      if (definition) {
        const previousDef = definition;
        definition = previousDef.Properties?.find(
          (x) => x.Property === pathPart
        );

        if (!definition) {
          definition = previousDef.Properties?.find(
            (x) => x.CollectAs === pathPart
          );
        }
      } else {
        definition = subDefinitions.find((x) => x.Property === pathPart);

        if (!definition) {
          definition = subDefinitions.find((x) => x.CollectAs === pathPart);
        }
      }
    } else {
      if (!definition) {
        definition = subDefinitions.find((x) => x.CollectAs === pathPart);

        if (!definition) {
          definition = subDefinitions.find((x) => x.Property === pathPart);
        }
      } else if (definition.Properties) {
        definition = definition.Properties.find(
          (x) => x.CollectAs === pathPart
        );
      } else {
        definition = undefined;
        breakLoop = true;
        return;
      }
    }
  });
  return definition;
}
