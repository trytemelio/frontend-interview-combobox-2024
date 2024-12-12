export const cleanStrings = (text: string) => {
    if (!!text) {
      const cleanedString = text
        ?.trim()
        ?.replace(/\s/g, "")
        ?.replace(/_/g, "")
        ?.replace(/,/g, "")
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ç/g, "c")
        ?.replace(/[^\x20-\x7E]/g, "")
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.toLowerCase();
  
      return cleanedString;
    }
  
    return ""
  };
  