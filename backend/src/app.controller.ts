import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Events } from './model/events';

@Controller('/v1/api/')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('event/:id')
  getEvent(@Param('id') id: string): Events {
    return this.appService.getEvent(id);
  }

  // Get all events
  @Get('events')
  getAllEvents(): Events[] {
    return this.appService.getAllEvents();
  }

  // Store a new event
  @Post('event')
  storeEvent(@Body() event: Events): Events[] {
    return this.appService.saveEvent(event);
  }

  // Delete a specific event by ID
  @Delete('event/:id')
  deleteEvent(@Param('id') id: string): Events[] {
    return this.appService.deleteEvent(id);
  }

  // Update an existing event
  @Put('event')
  updateEvent(@Body() event: Events): Events[] {
    return this.appService.updateEvent(event);
  }
}
