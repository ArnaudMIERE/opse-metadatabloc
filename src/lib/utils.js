/**
 * return a object to apply a style on tag
 * @return {any}
 * @param {any}
 */
export function applyPrimaryAndSecondaryColors(theme) {
    if (theme) {
      const style = {};
      if (theme.primaryColor) {
        style["--primaryColor"] = theme.primaryColor;
      }
      if (theme.secondaryColor) {
        style["--secondaryColor"] = theme.secondaryColor;
      }
      return style;
    } else {
      return "";
    }
  }
  
  export function formatEditedData(metadataName, dataEdited) {
    return {
      [metadataName]: dataEdited,
    };
  }
  
  // This is horrible but will be change, it must be done quickly
  export function badPatchToRemoveParagraphTag(internationalStringToPatch) {
    Object.keys(internationalStringToPatch).forEach(language => {
      internationalStringToPatch[language] = internationalStringToPatch[language].replace(/<p[^>]*>/g, "").replace(/<\/p[^>]*>/g, "");
    })
  }