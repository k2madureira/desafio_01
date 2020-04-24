const { uuid,isUuid } = require('uuidv4');

const repositories = [];

class repositorieController {

  index(__, res) {
    return res.json({repositories})
  }

  list(req, res) {
    const { title } = req.query;
    return res.json({repositories})
  }

  create(req, res) {

    const { title , url , techs } = req.body;
    const repositorie = {
      id:uuid(),
      title,
      url,
      techs,
      likes: 0
    }
  
    repositories.push(repositorie);
    
    return res.json(repositorie)
  }

  edit(req, res) {
    const { id } = req.params;
    const { title , url , techs, likes } = req.body;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return res.status(400).json({ error: 'Repositorie not found ! 😥'});
    }

    if( likes ) {
      return res.status(400).json({ error: "You can't update likes like this way ! 😜"})
    }

    const repositorie = {
      id,
      title,
      url,
      techs,
      likes: repositories[repoIndex].likes
    }

    repositories[repoIndex] = repositorie;
    
    return res.json(repositorie)
  }


  delete(req, res) {
    const { id } = req.params;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return res.status(400).json({ error: 'Repositorie not found ! 😥'})
    }

    repositories.splice(repoIndex, 1);
    
    return res.json({success: 'Repositorie deleted with success 😁'})
  }

  like(req, res) {
    const { id } = req.params;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return res.status(400).json({ error: 'Repositorie not found ! 😥'})
    }
    repositories[repoIndex].likes ++;
    const repositorie = repositories[repoIndex];
    
    return res.json(repositorie)
  }


}

module.exports = new repositorieController();