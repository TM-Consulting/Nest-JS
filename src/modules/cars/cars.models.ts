import * as mongoose from 'mongoose';


export class newCarDTO {
  name: string;
  brand: string;
  miles: number;
  horse_power: number;
}

export const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  miles: { type: Number, required: true },
  horse_power: { type: Number, required: true },
});

export interface Car extends mongoose.Document {
  id: string;
  name: string;
  brand: string;
  miles: number;
  horse_power: number;
}
