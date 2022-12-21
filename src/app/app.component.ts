
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Googla Map config varaibles
  @ViewChild('search') public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid'
  };
  latitude!: any;
  longitude!: any;
  
  constructor(private ngZone: NgZone) { }

  public ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
  
  public ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }

  public updateMapOnCountryChange(country:string) {
    // let selectedCountry =  new google.maps.places.Autocomplete(
    //   this.searchElementRef.nativeElement
    // );
    // this.ngZone.run(() => {
    //   //get the place result
    //   let place: google.maps.places.PlaceResult = country.getPlace();

    //   //verify result
    //   if (place.geometry === undefined || place.geometry === null) {
    //     return;
    //   }

    //   console.log({ place }, place.geometry.location?.lat());

    //   //set latitude, longitude and zoom
    //   this.latitude = place.geometry.location?.lat();
    //   this.longitude = place.geometry.location?.lng();
    //   this.center = {
    //     lat: this.latitude,
    //     lng: this.longitude,
    //   };
    // });
  }
}
