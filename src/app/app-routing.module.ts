import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/not-found-page/not-found.component";


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'system',
        loadChildren: () =>
            import('./system/system.module').then((x) => x.SystemModule),
    },
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
