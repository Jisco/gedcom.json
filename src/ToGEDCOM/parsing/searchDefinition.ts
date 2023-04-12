import { forEach, last } from "lodash";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";
import TagDefinition from "../../Common/TagDefinition";

export function SearchDefinition(
  subDefinitions: ITagDefinition[] | undefined,
  allDefinitions: ITagDefinition[],
  propertyPath: string
): TagDefinition | undefined {
  if (propertyPath.length === 0) {
    return undefined;
  }

  let definition: ITagDefinition | undefined;
  const pathParts = propertyPath.split(".");

  if (subDefinitions) {
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
  }
 
  // no nested definition found, get definition of last path property name
  if (!definition) {
    definition = allDefinitions.find(
      (x) => !x.CollectAs && x.Property === last(pathParts)
    );

    if (!definition) {
      definition = allDefinitions.find((x) => x.CollectAs === last(pathParts));
    }
  }

  return definition ? new TagDefinition(definition) : undefined;
}
