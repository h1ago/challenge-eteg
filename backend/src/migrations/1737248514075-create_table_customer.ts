import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomer1737248514075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.customer (
                id int NOT NULL,
                name varchar NOT NULL,
                cpf varchar NOT NULL,
                email varchar NOT NULL,
                favorite_color varchar NULL,
                notes text NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key(id)
        );
        
        CREATE SEQUENCE public.customer_id_seq
                AS int
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
        
        ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;
    
        ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table public.customer
    `);
  }
}
