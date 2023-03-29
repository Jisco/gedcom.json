import { forEach, last } from "lodash";
import ITagDefinition from "../../Common/interfaces/ITagDefinition";

export function SearchDefinition(
  definitions: ITagDefinition[],
  propertyPath: string
): ITagDefinition | undefined {
  if (definitions.length === 0 || propertyPath.length === 0) {
    return undefined;
  }

  let definition: ITagDefinition | undefined;
  let breakLoop = false;

  const pathParts = propertyPath.split(".");
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
        definition = definitions.find((x) => x.Property === pathPart);

        if (!definition) {
          definition = definitions.find((x) => x.CollectAs === pathPart);
        }
      }
    } else {
      if (!definition) {
        definition = definitions.find((x) => x.CollectAs === pathPart);

        if (!definition) {
          definition = definitions.find((x) => x.Property === pathPart);
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

  // no nested definition found, get definition of last path property name
  if (!definition) {
    definition = definitions.find(
      (x) => !x.CollectAs && x.Property === last(pathParts)
    );
  }

  return definition;
}
