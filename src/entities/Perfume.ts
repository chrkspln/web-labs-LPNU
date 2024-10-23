import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"

@Entity()
@Unique(["name"])
export class Perfume {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    brand: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar' })
    scent: string;

    @Column({ type: 'varchar' })
    volume: string;
}
