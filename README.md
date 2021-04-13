# wendy-webshop-project
**Wendy Hall Team project**
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

