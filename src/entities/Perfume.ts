import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
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
