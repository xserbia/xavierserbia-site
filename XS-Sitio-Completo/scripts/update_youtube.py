"""Refresh the public YouTube feed. Standard library only; no API key needed."""
import argparse,datetime,json,re,sys,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CHANNEL='UCQO8t8e6CEdq6JqzshZnlvA'
NS={'a':'http://www.w3.org/2005/Atom','yt':'http://www.youtube.com/xml/schemas/2015'}
def parse(xml):
 root=ET.fromstring(xml);videos={}
 for item in root.findall('a:entry',NS):
  ident=item.findtext('yt:videoId',namespaces=NS);title=item.findtext('a:title',namespaces=NS);published=item.findtext('a:published',namespaces=NS)
  if not ident or not re.fullmatch(r'[\w-]{11}',ident) or not title or not published:continue
  datetime.datetime.fromisoformat(published.replace('Z','+00:00'))
  videos[ident]={'id':ident,'title':title,'published':published}
 return sorted(videos.values(),key=lambda v:datetime.datetime.fromisoformat(v['published'].replace('Z','+00:00')),reverse=True)[:15]
def refresh(xml=None):
 if xml is None:
  req=urllib.request.Request('https://www.youtube.com/feeds/videos.xml?channel_id='+CHANNEL,headers={'User-Agent':'XavierSerbiaSite/1.0','Accept':'application/atom+xml'})
  with urllib.request.urlopen(req,timeout=30) as response:xml=response.read()
 videos=parse(xml)
 if not videos:raise ValueError('YouTube returned no videos; keeping the existing file.')
 dest=ROOT/'assets/youtube-videos.json'
 if dest.exists() and json.loads(dest.read_text())['videos']==videos:
  print('No new videos.');return False
 data={'videos':videos,'source':'youtube','fetchedAt':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 tmp=dest.with_suffix('.json.tmp');tmp.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');tmp.replace(dest)
 print('Updated',len(videos),'videos.');return True
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--feed-file',type=Path);args=parser.parse_args()
 try:refresh(args.feed_file.read_bytes() if args.feed_file else None)
 except Exception as error:print('YouTube refresh failed; existing videos retained:',error,file=sys.stderr);sys.exit(1)
