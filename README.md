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