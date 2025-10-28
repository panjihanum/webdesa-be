import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { Complaint } from '../../entities/complaint.entity';

@Controller('admin/complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Get()
  findAll(): Promise<Complaint[]> {
    return this.complaintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Complaint> {
    return this.complaintService.findOne(id);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'baru' | 'diproses' | 'selesai',
  ): Promise<Complaint> {
    return this.complaintService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.complaintService.remove(id);
  }
}
