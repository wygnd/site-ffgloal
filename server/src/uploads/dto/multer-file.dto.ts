export class MulterFileDto {
  buffer: Buffer;
  mimetype: string;
  originalname: string;

  constructor(file: Express.Multer.File | MulterFileDto) {
    this.buffer = file.buffer;
    this.mimetype = file.mimetype;
    this.originalname = file.originalname;
  }
}