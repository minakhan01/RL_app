import {AWClient} from 'aw-client';



class AWClientService {
  
  constructor() {
      // This is the function.
		    
    this.client=new AWClient('test-client')
    this.todayDate=new Date()
    this.tmrwDate=new Date()
    this.tmrwDate.setDate(this.todayDate.getDate() + 1);    
    this.todayDate=this.todayDate.toISOString().substring(0,10)
    this.tmrwDate=((this.tmrwDate).toISOString()).substring(0,10)
    this.client.getBuckets().then((buckets)=>{
      this.bucketMap={}
      for (var bucketid in buckets) {
		this.bucketMap[buckets[bucketid].client]=bucketid
      }		
	});

  }

  createBucketMap()
  {
    return this.client.getBuckets().then((buckets)=>{
      this.bucketMap={}
      for (var bucketid in buckets) {
		this.bucketMap[buckets[bucketid].client]=bucketid
      }		
	});
  }
  
  updateDate()
  {
    this.todayDate=new Date()
    this.tmrwDate=new Date()
    this.tmrwDate.setDate(this.todayDate.getDate() + 1);    
    this.todayDate=this.todayDate.toISOString().substring(0,10)
    this.tmrwDate=((this.tmrwDate).toISOString()).substring(0,10)
  }
  
  //get today's active windows in order 
  async getActiveWindows() {
    try {
      this.updateDate()
      if(typeof this.bucketMap === "undefined")
        await this.createBucketMap()
      const query = ["RETURN=query_bucket('"+(this.bucketMap['aw-watcher-window'])+"')"]
      const activeWindows=await this.client.query( [this.todayDate+'/'+this.tmrwDate], query)
      return activeWindows[0];
    } catch (error) {
      throw error;
    }
  }

  //get today's afk in order 
  async getAFK() {
    try {
      this.updateDate()
      if(typeof this.bucketMap === "undefined")
        await this.createBucketMap()

      var query = ["bucket='"+(this.bucketMap['aw-watcher-afk'])+"';","RETURN=query_bucket(bucket);"]
      const afk=await this.client.query( [this.todayDate+'/'+this.tmrwDate], query)
      return afk[0];
    } catch (error) {
      throw error;
    }
  }

  //find total time per app in the day excluding video streaming AFK
  async getAppTotalWithoutAudio() {
    try {
      this.updateDate()
      if(typeof this.bucketMap === "undefined")
        await this.createBucketMap()
      
      var query = [
        "window_events = query_bucket('"+(this.bucketMap['aw-watcher-window'])+"');",
 	    "not_afk_events = query_bucket('"+(this.bucketMap['aw-watcher-afk'])+"');",
        "not_afk_events = filter_keyvals(not_afk_events, 'status', ['not-afk']);",
	    "window_events = filter_period_intersect(window_events, not_afk_events);",
	    "events = merge_events_by_keys(window_events, ['app']);",
	    "events = sort_by_duration(events);",
        "RETURN = events;"
      ]    
      const appTotalWithoutAudio=await this.client.query( [this.todayDate+'/'+this.tmrwDate], query)
      return appTotalWithoutAudio[0];
    } catch (error) {
      throw error;
    }
  }

  //find total time per app in the day including video streaming AFK
  async getAppTotalWithAudio() {
    try {
      this.updateDate()
      if(typeof this.bucketMap === "undefined")
        await this.createBucketMap()
       
      var query = [
       "window_events = query_bucket('"+(this.bucketMap['aw-watcher-window'])+"');",
	   "not_afk_events = query_bucket('"+(this.bucketMap['aw-watcher-afk'])+"');",         
	   "not_afk_events = filter_keyvals(not_afk_events, 'status', ['not-afk']);",
       "web_events = query_bucket('"+(this.bucketMap['aw-client-web'])+"');",
	   "audible_events = filter_keyvals(web_events, 'audible', [true]);",
	   "afk_events = query_bucket('"+(this.bucketMap['aw-watcher-afk'])+"');",         
	   "afk_events = filter_keyvals(afk_events, 'status', ['afk']);",
	   "audible_afk_events = filter_period_intersect(audible_events,afk_events);",         
       "not_afk_events = concat(not_afk_events, audible_afk_events);",
	   "window_events = filter_period_intersect(window_events, not_afk_events);",
	   "events = merge_events_by_keys(window_events, ['app']);",
	   "events = sort_by_duration(events);",
       "RETURN = events;"
      ]
        
      const appTotalWithAudio=await this.client.query( [this.todayDate+'/'+this.tmrwDate], query)
      return appTotalWithAudio[0];
    } catch (error) {
      throw error;
    }
  }

  //find currently active window
  async getCurrentlyActiveWindow() {
    try {
      this.updateDate()
      if(typeof this.bucketMap === "undefined")
        await this.createBucketMap()
      
      var query = [
        "RETURN=query_bucket('"+(this.bucketMap['aw-watcher-window'])+"')"
      ]
        
      const activeWindows=await this.client.query( [this.todayDate+'/'+this.tmrwDate], query)
      return activeWindows[0][0];
    } catch (error) {
      throw error;
    }
  }

}

export default AWClientService;
