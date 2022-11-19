import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GraphComponent } from './graph/graph.component';
import { RoomOneComponent } from './room-one/room-one.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'graph',
    component: GraphComponent,
  },
  {
    path: 'room/:data',
    component: RoomOneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
