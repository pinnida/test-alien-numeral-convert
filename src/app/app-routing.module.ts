import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlienConverterComponent } from './components/alien-converter/alien-converter.component';

const routes: Routes = [
  { path: '', redirectTo: '/alien', pathMatch: 'full' },
  { path: 'alien', component: AlienConverterComponent },
  { path: '**', redirectTo: '/alien' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
