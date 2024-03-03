import { IRelashionship } from "../../dtos";

export type TClassification = {
   id: string;
   ponts: number;
   rank: number;
   segment: string;
};

export type IMetricUser = {
   totalPonts: number;
   totalVendas: number;
   totalCompras: number;
   totalPresence: number;
   classification: TClassification[];
   satisfiedPorcentege: number;
   getVendas: IRelashionship[];
   getCompras: IRelashionship[];
   currencyVendas: string;
   currencyCompras: string;
   satisfiedPresence: number;
   IdealPresence: number;
   totalPendente: number;
   handshak: number;
};

export type TGlobalMetric = {
   consumoTotal: string
}
