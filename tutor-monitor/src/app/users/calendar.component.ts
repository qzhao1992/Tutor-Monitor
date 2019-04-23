import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, endOfHour, startOfHour} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, 
    CalendarView, CalendarDayViewBeforeRenderEvent,
    CalendarMonthViewBeforeRenderEvent,
    CalendarWeekViewBeforeRenderEvent} from 'angular-calendar';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';  
import * as moment from 'moment';
import RRule from 'rrule';



const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

interface RecurringEvent {
    title: string;
    color: any;
    rrule?: {
      freq: any;
      bymonth?: number;
      bymonthday?: number;
      byweekday?: any;
    };
  }
  

@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['calendar.css'],
    templateUrl: 'calendar.html'
})
export class CalendarComponent {
    
    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    
    
    users: any = [];
    db : any;

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = []

    activeDayIsOpen: boolean = true;

    constructor(
        private modal: NgbModal,
        firebase: AngularFirestore
        ) { 
        this.db = firebase;
        this.users = this.db.collection('users').snapshotChanges().pipe(map((users:any) => users.map(a =>{
            let data = a.payload.doc.data();
            data["id"] =a.payload.doc.id;
            return data;
        }))).subscribe((users) =>{

            this.users = users;
            console.log("users: ",this.users )
            this.setEvent(this.users)
        });
    }

    setEvent(users){
        console.log(typeof new Date());
        for(let i = 0; i < users.length; i++){
            if(users[i].startSchedule){
                console.log("??: ", moment(users[i].startSchedule.seconds *1000).format())
                console.log("??: ", moment(users[i].endSchedule.seconds *1000).format())
                this.events.push({
                    start : startOfHour(moment(users[i].startSchedule.seconds * 1000).format()),
                    end : endOfHour(moment(users[i].endSchedule.seconds * 1000).format()),
                    // dtstart: moment(users[i].startSchedule.seconds * 1000).startOf('day').toDate(),
                    title : users[i].role == "student" ? "Appointment by " + users[i].firstName : users[i].firstName,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true
                    },
                    allDay : false,
                    // draggable: true,
                })
            }
        }
        this.refresh.next();
        console.log("this.events: ", this.events)
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map(iEvent => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            }
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter(event => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
}