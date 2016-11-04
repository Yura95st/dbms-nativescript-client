import { Attribute } from './attribute.model';
import { Row } from './row.model';

export interface Table {
    Name: string;
    Attributes: Attribute[];
    Rows: Row[];
}