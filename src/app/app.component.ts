import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    for (let i = 1; i <= 10; i++) {
      this.matIconRegistry.addSvgIcon(
        `numeric-${i}-circle`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/numeric-${i}-circle.svg`)
      );
      this.matIconRegistry.addSvgIcon(
        `numeric-${i}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/numeric-${i}.svg`)
      );
    }

    this.matIconRegistry.addSvgIcon(
      `alpha-n`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-n.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `alpha-r`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-r.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `alpha-n-box`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-n-box.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `alpha-r-box`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-r-box.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `alpha-n-box-outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-n-box-outline.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `alpha-r-box-outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-r-box-outline.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `alpha-n-circle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-n-circle.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `alpha-r-circle`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-r-circle.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `alpha-n-circle-outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-n-circle-outline.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `alpha-r-circle-outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/alpha-r-circle-outline.svg`)
    );
  }
}
