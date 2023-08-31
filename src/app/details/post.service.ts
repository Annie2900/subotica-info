import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  placeholderImageUrl: string = 'https://www.colorhexa.com/f44336.png';
  tagoviNames: string[] = [];
  licnostiNames: string[] = [];
  post: any; 
  photoGalleryImages: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const tab = params['tab'];
      const nid = params['id'];
      const endPoint = this.getEndPointFromUrl(tab);
      this.postService.getPostDetails(endPoint, tab, nid).subscribe(
        (data) => {
          console.log(data);
          const matchingPost = data.nodes.find(item => item.node.Nid === nid);
          if (matchingPost) {
            console.log(matchingPost);
            this.post = matchingPost.node;

            // const photoGalleryString = matchingPost.node['Photo gallery'];
            // const cleanedPhotoGalleryString = photoGalleryString.trim().slice(0,-1);
      
            // try {
            //   this.photoGalleryImages = JSON.parse(cleanedPhotoGalleryString);
            // } catch (error) {
            //   console.error('Error parsing Photo gallery:', error);
            //   console.log('Photo gallery string:', cleanedPhotoGalleryString);
            // }
            if (this.post['Licnosti']) {
              const licnostiString = this.post['Licnosti'];
              this.licnostiNames = licnostiString.split(',').map(name => name.trim());
            }
  
            // Check if Tagovi property is defined before splitting
            if (this.post['Tagovi']) {
              const tagoviString = this.post['Tagovi'];
              this.tagoviNames = tagoviString.split(',').map(name => name.trim());
            }
          }
        },
        (error) => {
          console.error(error);
        }
      ); 
    });
  }
  // isVodecaSlikaEmpty(): boolean {
  //   return !this.post?.['Vodeca slika'] || this.post['Vodeca slika'] === '';
  // }
  getEndPointFromUrl(url: string): string {
    const mappingList = [
      { url: 'latest',  endPoint: 'article' }, 
      { url: 'najava',  endPoint: 'najava' }, 
      { url: 'zajednica',  endPoint: 'article' }, 
      { url: 'kultura', endPoint: 'article' }, 
      { url: 'sport',  endPoint: 'article' }, 
      { url: 'privreda', endPoint: 'article' }, 
      { url: 'video',  endPoint: 'article' }, 
      { url: 'dailyphoto',  endPoint: 'dailyphoto' }, 
      { url: 'press',endPoint: 'article' }, 
      { url: 'intervju', endPoint: 'intervju' }, 
      { url: 'tbn', endPoint: 'tbn' }, 
      { url: 'panoramica', endPoint: 'panoramica' }, 
      { url: 'search', endPoint: 'article' }
    ];
  
    const matchingMapping = mappingList.find(mapping => mapping.url === url);
    return matchingMapping ? matchingMapping.endPoint : '';
  }

  goBack(): void {
    this.location.back(); 
  }
}
