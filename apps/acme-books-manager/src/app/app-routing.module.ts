import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: () =>
      import('@acme/feature-books-manager').then(
        (m) => m.AcmeFeatureBooksManagerModule
      ),
    title: 'Books Manager',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
