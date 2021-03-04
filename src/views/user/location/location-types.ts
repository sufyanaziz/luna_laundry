export type LocationType = {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  locality: string;
  localityInfo: {
    administrative: Administrative[];
    informative: Informative[];
  };
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
};

type Administrative = {
  adminLevel: number;
  description: string;
  geonameId: number;
  isoCode: string;
  isoName: string;
  name: string;
  order: number;
  wikidataId: string;
};

type Informative = {
  description: string;
  geonameId: number;
  isoCode: string;
  name: string;
  order: number;
  wikidataId: string;
};
