import axios from '@/utils/axios'

/* 查找数据 */
export function findAllProvince() {
  return axios.get('/Province/findAll');
  // return axios.get('/Province/findAll',{params:params});
  // return axios.post('/Province/findAll',params);
}
/**
 * 根据id删除城市信息
 * @param {Object} param {id:''}
 */
export function deleteProvinceById(param){
  return axios.post('/Province/deleteById',param);
}
/**
 * 通过id查找商家信息
 * @param {Object} param {id:''} 
 */
export function findProvinceById(param){
  return axios.get('/Province/findById',{params:param});
}
/**
 * 新增或修改商家信息
 * @param {Object} param 
 */
export function saveOrUpdateProvince(param){
  return axios.post('/Province/saveOrUpdate',param);
}