import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostNajava, PostZajednica, PostKultura, PostSport, PostPrivreda, PostVideo, PostDailyphoto, PostPress, PostIntervju, PostTbn, PostPanoramica, PostSearch } from './post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  currentTab: string = ''; 
  loadedPosts: (Post | PostNajava | PostZajednica | PostKultura | PostSport | PostPrivreda | PostVideo | 
    PostDailyphoto | PostPress | PostIntervju | PostTbn | PostPanoramica | PostSearch)[] = []; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.fetchPosts();
      this.route.url.subscribe(segments => {
      this.currentTab = segments[0].path; 

    });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.route.url.subscribe(segments => {
      const section = segments[0].path; 
      const apiUrl = `https://www.subotica.info/restful-${section}`;
  
      this.http.get<any>(apiUrl).subscribe(responseData => {
        if (section === 'latest') {
          this.loadedPosts = responseData.nodes as Post[];
        } 
        else if (section === 'najava') {
          this.loadedPosts = responseData.nodes as PostNajava[];
        }
        else if (section === 'zajednica') {
          this.loadedPosts = responseData.nodes as PostZajednica[];
        }
        else if (section === 'kultura') {
          this.loadedPosts = responseData.nodes as PostKultura[];
        }
        else if (section === 'sport') {
          this.loadedPosts = responseData.nodes as PostSport[];
        }
        else if (section === 'privreda') {
          this.loadedPosts = responseData.nodes as PostPrivreda[];
        }
        else if (section === 'video') {
          this.loadedPosts = responseData.nodes as PostVideo[];
        }
        else if (section === 'dailyphoto') {
          this.loadedPosts = responseData.nodes as PostDailyphoto[];
        }
        else if (section === 'press') {
          this.loadedPosts = responseData.nodes as PostPress[];
        }
        else if (section === 'intervju') {
          this.loadedPosts = responseData.nodes as PostIntervju[];
        }
        else if (section === 'tbn') {
          this.loadedPosts = responseData.nodes as PostTbn[];
        }
        else if (section === 'panoramica') {
          this.loadedPosts = responseData.nodes as PostPanoramica[];
        }
        else if (section === 'search') {
          this.loadedPosts = responseData.nodes as PostSearch[];
        }
        console.log(this.loadedPosts);
      });
    });
  }
  
}
