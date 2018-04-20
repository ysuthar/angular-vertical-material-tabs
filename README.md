angular-vertical-tabs
=====================
Simple vertical tabs using `@angular/material` and `@angular/flex-layout`.


## Install

    npm i --save SamuelMarks/angular-vertical-tabs

## Usage

See [example](src/app). Only difference in your app is your imports:

    import { TabsModule } from 'angular-vertical-tabs/dist';
    
    // add it to the `imports:` of your relevant `@NgModule`
    imports: [ TabsModule.forRoot() ]

Then in your template:

    <vertical-tabs [multi]=true [selectFirstTab]=true [showSelectAll]=true>
      <vertical-tab tabTitle="Tab 0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris tincidunt mattis neque lacinia dignissim.
        Morbi ex orci, bibendum et varius vel, porttitor et magna.
      </vertical-tab>
    
      <vertical-tab tabTitle="Tab b">
        Curabitur efficitur eleifend nulla, eget porta diam sodales in.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Maecenas vestibulum libero lacus, et porta ex tincidunt quis.
      </vertical-tab>
    
      <vertical-tab tabTitle="Tab 2">
        Sed dictum, diam et vehicula sollicitudin, eros orci viverra diam, et pretium
        risus nisl eget ex. Integer lacinia commodo ipsum, sit amet consectetur magna
        hendrerit eu.
      </vertical-tab>
    </vertical-tabs>


## Approach
Started with Juri Strumpflohner's egghead project, then:

  - removed Twitter Bootstrap
  - added `@angular/material`
  - added `@angular/flex-layout`

Finally was able to implement new features and resolve existent bugs :)
