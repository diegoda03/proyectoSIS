

drop table VENTA_CAMISETA;
drop table VENTA;
drop table CLIENTE;
drop table STOCK_CAMISETA;
drop table USUARIOWEB;
drop table DISENNO;
drop table CAMISETA;
drop table TIPO_CAMISETA;

/*==============================================================*/


create table CAMISETA (
   ID_CAMISETA          NUMERIC(10)          not null,
   ID_TIPOCAM           NUMERIC(10)          null,
   IMG			VARCHAR(40)	     not null,
   COLOR                VARCHAR(20)          not null,
   constraint PK_CAMISETA primary key (ID_CAMISETA)
);


create table DISENNO (
   ID_DISENNO           NUMERIC(10)          not null,
   NOMBRE               VARCHAR(20)          not null,
   DESCRIPCION          TEXT                 not null,
   IMAGEN               VARCHAR(50)          not null,
   AUTOR		NUMERIC(10)	     null,
   constraint PK_DISENNO primary key (ID_DISENNO)
);

create table TIPO_CAMISETA (
   ID_TIPOCAM           NUMERIC(10)          not null,
   NOMBRE               VARCHAR(30)          not null,
   constraint PK_TIPO_CAMISETA primary key (ID_TIPOCAM)
);

create table STOCK_CAMISETA (
   ID_STOCKCAM           NUMERIC(10)          not null,
   ID_CAMISETA          NUMERIC(10)          not null,
   TALLA                VARCHAR(10)          not null,
   CANTIDAD             NUMERIC(10)          not null,
   constraint PK_STOCK_CAMISETA primary key (ID_STOCKCAM)
);

create table VENTA_CAMISETA (
   ID_VENTACAM          NUMERIC(10)          not null,
   ID_STOCKCAM          NUMERIC(10)          not null,
   ID_DISENNO           NUMERIC(10)          not null,
   ID_VENTA             NUMERIC(10)          not null,
   CANTIDAD             NUMERIC(10)          not null,
   POSICION             VARCHAR(80)          not null,
   constraint PK_VENTA_CAMISETA primary key (ID_VENTACAM)
);

create table VENTA (
   ID_VENTA             NUMERIC(10)          not null,
   VALOR                NUMERIC(15)          not null,
   DOC_CLIENTE          NUMERIC(10)          not null,
   constraint PK_VENTA primary key (ID_VENTA)
);


create table CLIENTE (
   DOCUMENTO            NUMERIC(10)          not null,
   USUARIO              VARCHAR(10)          not null,
   NOMBRE               VARCHAR(30)          not null,
   TELEFONO             NUMERIC(10)          not null,
   EMAIL                VARCHAR(20)          not null,
   DIRECCION            VARCHAR(20)          not null,
   constraint PK_CLIENTE primary key (DOCUMENTO)
);
create table USUARIOWEB (
   USUARIO              VARCHAR(10)          not null,
   PASSWORD             VARCHAR(10)          not null,
   TIPO_USUARIO         VARCHAR(10)          not null,
   constraint PK_USUARIOWEB primary key (USUARIO)
);

/*==============================================================*/

alter table CAMISETA
   add constraint FK_CAMISETA_REFERENCE_TIPO_CAM foreign key (ID_TIPOCAM)
      references TIPO_CAMISETA (ID_TIPOCAM)
      on delete restrict on update restrict;


alter table STOCK_CAMISETA
   add constraint FK_STOCK_CAMISETA_REFERENCE_CAMISETA foreign key (ID_CAMISETA)
      references CAMISETA (ID_CAMISETA)
      on delete restrict on update restrict;

alter table VENTA_CAMISETA
   add constraint FK_VENTA_CAMISETA_REFERENCE_STOCK_CAMISETA foreign key (ID_STOCKCAM)
      references STOCK_CAMISETA (ID_STOCKCAM)
      on delete restrict on update restrict;

alter table VENTA_CAMISETA
   add constraint FK_VENTA_CAMISETA_REFERENCE_DISENNO foreign key (ID_DISENNO)
      references DISENNO (ID_DISENNO)
      on delete restrict on update restrict;

alter table VENTA_CAMISETA
   add constraint FK_VENTA_CAMISETA_REFERENCE_VENTA foreign key (ID_VENTA)
      references VENTA (ID_VENTA)
      on delete restrict on update restrict;

alter table VENTA
   add constraint FK_VENTA_REFERENCE_CLIENTE foreign key (DOC_CLIENTE)
      references CLIENTE (DOCUMENTO)
      on delete restrict on update restrict;

alter table CLIENTE
   add constraint FK_CLIENTE_REFERENCE_USUARIOW foreign key (USUARIO)
      references USUARIOWEB (USUARIO)
      on delete restrict on update restrict;

/*==============================================================*/
insert into tipo_camiseta (id_tipocam, nombre) values (1, 'Cuello redondo');

insert into tipo_camiseta (id_tipocam, nombre) values (2, 'Cuello V');

insert into tipo_camiseta (id_tipocam, nombre) values (3, 'Cuello tipo polo');

insert into camiseta (id_camiseta, id_tipocam, img, color) values (1,1,'public/images/cam1.png', 'AZUL');
insert into camiseta (id_camiseta, id_tipocam, img, color) values (2,2,'public/images/cam2.png', 'NEGRA');
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (1,1,'S',13);
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (2,1,'M',10);
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (3,1,'L',6);
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (4,2,'S',16);
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (5,2,'M',8);
insert into stock_camiseta (id_stockcam, id_camiseta, talla, cantidad) values (6,2,'L',13);
insert into disenno (id_disenno, nombre, descripcion, imagen, autor) values (1, 'Montaña verde', 'Paisaje con Montaña ', 'public/images/dis1.png',1);
insert into disenno (id_disenno, nombre, descripcion, imagen, autor) values (2, 'Aurora Borealis', 'Foto tomada de la aurora polar', 'public/images/dis2.png',2);



