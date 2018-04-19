angular-vertical-tabs
=====================
Simple vertical tabs using `@angular/material` and `@angular/flex-layout`.


## Install

    npm i --save SamuelMarks/angular-vertical-tabs

## Usage

See [example](src/app). Only difference in your app is your imports:

    import { TabsModule } from 'angular-vertical-tabs/dist';
    
    // add it to the `imports:` of your relevant `@NgModule`


## Approach
Started with Juri Strumpflohner's egghead project, then:

  - removed Twitter Bootstrap
  - added `@angular/material`
  - added `@angular/flex-layout`
