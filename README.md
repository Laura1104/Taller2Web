# Respuestas

---

### Q1 

Sin el decorador @Get(), NestJS no registra la función como un endpoint. Al llamar GET /tasks se recibe un 404 Not Found porque la ruta simplemente no existe para NestJS findAll() es solo una función de TypeScript sin ninguna ruta asociada. Para corregirlo, se debe agregar @Get() justo antes del método.

---

### Q2 

No hacen lo mismo. transform: true convierte el tipo después de que el cuerpo del request es parseado, y solo funciona cuando NestJS ya conoce el tipo esperado desde el DTO. Por otro lado, ParseIntPipe actúa antes, directamente sobre el parámetro de la URL, y lanza un 400 de manera inmediata si el valor no puede convertirse. Son complementarios: transform maneja el body, ParseIntPipe protege los params de ruta.

---

### Q3 

Con solo whitelist: true, la respuesta es 201 y el usuario se crea correctamente. El campo "password" es eliminado  antes de llegar al service (este nunca lo ve ni lo guarda). El problema de seguridad es que el cliente recibe un 201 y no sabe que su campo fue ignorado. En una app real, podría asumir que el password fue guardado cuando en realidad no, creando una falsa sensación de seguridad.

---

### Q4 

Sí, modificar un objeto devuelto por findAll() sí cambia los datos almacenados en el service, porque JavaScript pasa los objetos por referencia findAll() devuelve el array original y cada objeto dentro es el mismo en memoria. Para prevenirlo, se pueden devolver copias:

```typescript
findAll(): Product[] {
  return this.products.map(p => ({ ...p }));
}
```


---

### Q5 

{"price": -50}  la validación falla con 400. El campo llegó con valor -50, lo cual viola @IsPositive().

{}  la validación pasa. @IsOptional() le indica a class-validator que si el campo está ausente (`undefined o null), se deben ignorar todos los demás validadores de ese campo. Sin embargo, si el valor sí llega, aunque sea inválido, los demás decoradores sí se aplican.

---

### Q6 

El nuevo task recibe el siguiente valor de nextId, no el id 1. Como nextId solo incrementa y nunca retrocede, findOne(1) nunca devolverá el task incorrecto.

Usar this.tasks.length + 1 sí causaría problemas:
Crear task : id=1, length=1
Crear task : id=2, length=2
Eliminar task 1 : length=1
Crear task : id = 1+1 = 2   ya existe un task con id 2


---

### Q7

a El servidor arranca normalmente sin crashear.  
b POST /users  devuelve 404 Not Found porquee NestJS nunca registró las rutas de `UsersModule`.

Es un error en tiempo de ejecución que ocurre al arrancar el servidor. No es un error de compilación porque TypeScript no valida los imports de @Module. El servidor no falla, pero las rutas nunca quedan expuestas.

---

### Q8 

Por defecto, un handler con @Post() devuelve 200 OK. La ausencia de @HttpCode(201) no es "funcionalmente" incorrecta en el sentido de que el recurso sí se crea, pero el estándar HTTP establece que una creación exitosa debe responder con 201. Clientes que verifiquen el status code podrían interpretar el 200 como que no se creó nada nuevo.

---

### Q9 

Si el service devolviera null, el controller tendría que manejar el error manualmente en cada lugar que lo llame:

```typescript
// Service
findOne(id: number): Product | null {
  return this.products.find((p) => p.id === id) ?? null;
}

// Controller
findOne(@Param('id', ParseIntPipe) id: number) {
  const product = this.productsService.findOne(id);
  if (!product) {
    throw new NotFoundException(`Product #${id} not found`);
  }
  return product;
}
```

Lanzar NotFoundException directamente en el service es la mejor opción porque findOne también es llamado desde update y remove. Con null, cada caller necesitaría su propia revisión. Con la excepción, el manejo del error está en un solo lugar y todos los callers se benefician.