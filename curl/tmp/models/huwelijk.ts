/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Overige_Objecten_Assent } from './Overige_Objecten_Assent';
import type { Overige_Objecten_SDG } from './Overige_Objecten_SDG';

export type huwelijk = {
  /**
   * De unieke identificatie van dit huwelijks
   *
   */
  readonly id?: string;
  /**
   * De in dit huwelijk betrokken partners, bestaande uit hun instemmming (Assent) en getuigen.
   */
  partners?: Array<Overige_Objecten_Assent>;
  getuigen?: Array<Overige_Objecten_Assent>;
  /**
   * Het juridische type van dit huwelijk zo als opgehaald uit de SDG catalogus, zijnde huwelijk, parnterschap of omzetting
   */
  type?: Overige_Objecten_SDG;
  /**
   * De cermonie (manier) waarop het huwelijk wordt volgrokken. Bijvoorbeeld gratis, flits, eenvoudig of uitgebreid.
   */
  ceremonie?: Overige_Objecten_SDG;
  /**
   * Verwijzing(uri) naar de **Locatie** in het SDG, bij ophalen kan de query parameter &extend[]=locatie worden gebruikt om een volledig object op te halen.
   */
  locatie?: Overige_Objecten_SDG;
  /**
   * Verwijzing(uri) naar de **Ambtenaar** in het SDG, bij ophalen kan de query parameter &extend[]=ambtenaarworden gebruikt om een volledig object op te halen.
   */
  ambtenaar?: Overige_Objecten_SDG;
  status?: huwelijk.status;
  /**
   * Het moment waarop het huwelijk aanvangt
   */
  moment?: string;
  /**
   * De bij dit huwelijk gekozen extra producten
   */
  producten?: Array<Overige_Objecten_SDG>;
  readonly checklist?: {
    /**
     * Onder partners word gecontroleerd op:
     * - Leeftijd partner 1 (ouder dan 18 op trouwdatum)
     * - Leeftijd partner 2 (ouder dan 18 op trouwdatum)
     * - Bevestiging partner 1
     * - Bevestiging partner 2
     * - Aantal partners (minimaal 2, maximaal 2)
     * - Huwelijksstaat partner 1 (geen huidige partner, WORD PAS GECONTROLEERD NA BEVESTIGING BIJDE PARTNERS)
     * - Huwelijksstaat partner 2 (geen huidige partner, WORD PAS GECONTROLEERD NA BEVESTIGING BIJDE PARTNERS)
     * - Bloedverwantschap (geen fammilie in de tweede graad)
     */
    partners?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder getuigen word gecontrolleerd of:
     * - Heeft iedere partner minimaal 1 getuigen
     * - Heeft iedere partner maximaal 2 getuigen
     * - Hebben alle getuigen ingestemd
     */
    getuigen?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder ambtenaar wordt er gecontroleerd op:
     * - Is er een trouwambtenaar aan het huwelijk gekoppeld
     * - Is deze gereserveerd en beschickbaar
     * - Heeft deze bevestigd
     */
    ambtenaar?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder moment wordt er gecontroleerd op:
     * - Is het moment minimaal 2 weken in de toekomst
     * - Is het moment maximaal 1 jaar in de toekomst
     * - Vanaf de status "melding" worden deze controles niet meer geupdate
     */
    moment?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder producten word gecontroleerd op:
     * - Niks, producten zijn optioneel
     */
    producten?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder order wordt er gecontroleerd op:
     * - Is er een order
     * - Is het totaal van de order gelijk aan het totaal van het huwelijks
     * - Is de order betaald
     */
    order?: {
      result?: boolean;
      display?: string;
    };
    /**
     * Onder zaak wordt gecontroleerd op:
     * - afhankenlijk van gemeentenlijke configuratie
     */
    zaak?: {
      result?: boolean;
      dispay?: string;
    };
  };
  /**
   * Bij het melden van het voorgenomen huwelijk word een order gecreërd. Dit order bevat ook de betaallink. , bij ophalen kan de query parameter &extend[]=order worden gebruikt om een volledig object op te halen.
   */
  readonly order?: string;
  /**
   * Een zaak bevat de ZRC verwijzing naar een zaak, mits de gemeente deze als verplicht heet ingecalculeerd. De zaak wordt onderwater autotmatisch gecreerd. , bij ophalen kan de query parameter &extend[]=zaak worden gebruikt om een volledig object op te halen.
   */
  readonly zaak?: string;
  /**
   * Een ISO kosten opgaaf voor het huwelijk bestaande uit een drie cijferige valuta code gevold door het bedrag zonder decimalen e.g. EUR 150 voor € 1,50
   */
  readonly kosten?: string;
  /**
   * De verwijzing van de isntemming van de gemeente met het huwelijk of parterschap
   */
  instemmingGemeente?: Overige_Objecten_Assent;
};

export namespace huwelijk {
  export enum status {
    CONCEPT = 'concept',
    REPORTED = 'reported',
    CONFIRMED = 'confirmed',
    EXECUTED = 'executed',
    CANCELLED = 'cancelled',
  }
}
