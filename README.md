# wendy-webshop-project /Wendy Hall Team project/

A feladat leírása itt található: https://github.com/green-fox-academy/teaching-materials/tree/master/project/basic-web#readme



**Conflict megoldasa localban:**

vissza kell menni a feature branchre: git checkout <branch neve>
GIT MERGE MASTER
mindig azt mergeljuk be, amiben allunk eppen, most a mastert mergeljuk a branchre
--> elkezdi mergelni
--> kiirja, hogy gond van
--> ha meg folyamatban van a merge, de kozben rajovunk, h megsem akarunk meg mergelni, akkord:
GIT MERGE --abort
--> leallitja a folyamatot

vscode-ban latszik is mas szinnel, h hoppa, nem stimmel valami 
current change: a branch kodja
incoming change: ami a masterrol jon
accept both change: mindkettot el lehet fogadni
compare changes: megnyitja ket kulon ablakban, es ki is emeli, a conflictes sort

kijavitjuk a hibat, utana git add, git commit --> kilep a mergelesbol
git push


**Workflow:**

1. git pull --> lehuzod a maint 
2. git checkout develop --> atlepes a develop branch-re
3. git pull / git pull origin develop --> lehuzza a developot
4. git checkout -b your-awesome-feature develop --> letrehoz a developrol elagazva egy uj branchet, es be is lep
5. work
6. git pull / git pull origin develop --> lehuzod a developot, hogy lasd, van-e conflict
7. git checkout develop --> visszalepsz a develop branch-re
8. git merge your-awesome-feature --> a developot es a local branch-et oszzefuzod
9. git push / git push origin develop --> a develop-t felpusholod
10. git branch -d your-awesome-feature --> torlod a local branchedet, mert feleslegesse valt

Ha a 8. lepest kihagyod, es ugy pusholsz, akkor letrehoz egy uj upstream agat, ami meg nincs oszzefuzve (merge) a developpal.

git branch -a -val megnezheted az osszes (remote es local) branch-et.


**Hasznos parancsok:**
git add + git commit shortcut: git commit -am "message"


git log 
    --> listazza az osszes commitot
    --> a mergnek is van commitja

git show <commit id>
    --> reszletek az adott commitrol
    --> q-val lehet kilepni


**HEAD:**
A head alapbol az legutobbi commit.
=> git checkout <commit id> --> a head innentol erre a commitra fog mutatni
    ---> ezzel visszalepek a megadott verziohoz ( ez a verzio lesz az aktualis head, azaz ezt fogom latni a vscode-ban is)
    ---> viszont innentol ez a commit mar nem resze a masternek ( vagy annak, ahonnan letrejott )
    ---> log a levegoben

commit ujra resze legyen a branch-nek:
    => ha azt szeretnem h ez a korabbi commit legyen az utolso, innen haladjak tovabb, a legutolso commitra nincs szuksegem, akkor:
        1. vissza kell menni a last commithoz: git <branch neve>
        2. git log: itt latom, h mi a head, ill. a commit id-kat
        3. git reset --hard <commit id-ja, amit headnek szeretnek>
        --> a masik commit elveszik (azaz ebben az esetben a legutobbi)
        --> ezzel nagyon ovatosan kell banni, mert nem lehet, vagy nagyon nehez visszahozni az elveszett commitot!!




**Valtas az elozo commitra: (meg nem commitoltam azota)** => valtas elozo commitra/nem tartom meg a valtoztatasokat
- irtam valamit, nem nem mukodik, nem akarom megtartani
- meg nem commitoltam
- vissza akarom csinalni az unstaged valtoztatasaimat, es vissza akarok terni az utolso commithoz

git checkout -- .

--> ezzel visszavalt a legutobbi commitolt valtozatra



**STASH:** => valtas elozo commitra/megtartom a valtoztatasokat
git stash
visszamegyek egy elozo verziohoz ugy, h a valtoztatasaim nem vesznek el
( elrakom egy kulon 'polcra')

git stash apply 
 --> kiirja, milyen fileokat modositottam, ezek a modositasok vannak most a 'polcon'

ha megint irok valami kodot, es ujra git stash, akkor azt egy masik stash-re rakja
git stash list 
 --> kiirja a stash-ek listajat

git stash apply
az utolso stash-elt valtozatot fogja mutatni

git stash apply 1
az 1-el indexelt stash-t fogja csak mutatni

megint varialok valamit
akkor a stash-re a valtoztatasaimat elmenthetem igy is:
git stash push -m "message"

ha nem kell valamelyik stash:
git stash drop <index>


ha ugy dontok, hogy valamelyik stash mar rendben van, szeretnem visszatenni a fileba, akkor
git stash pop <index>
ezzel ki is torli a stash-t 


a teljes stash list torlese:
git stash clear


**Conflict:**
1. donthetek, hogy melyik verziot akarom megtartani, ra kell kattintani a megfelelo menupontra, vagy csak kitorlom ami nem kell, valtoztatok, megoldom.
2. ujra commit!
3. merge

