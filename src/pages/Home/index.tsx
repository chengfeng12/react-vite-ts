import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Observer from 'gsap/Observer'

function Home() {
  // 创建carousel容器的ref，初始值为null，类型为HTMLDivElement
  const carouselRef = useRef<HTMLDivElement>(null)

  // 创建存储所有轮播图片元素的ref，初始为空数组，类型为HTMLElement数组
  const imagesRef = useRef<HTMLElement[]>([])

  // 使用useEffect处理副作用，依赖数组为空表示只在组件挂载时执行一次
  useEffect(() => {
    // 调试用：打印当前carousel容器的DOM元素
    console.log(carouselRef.current, 'carouselRef.current')

    // 安全判断：如果容器ref未绑定则直接返回
    if (!carouselRef.current) return

    // 获取所有带.carousel-image类的元素并转换为HTMLElement数组
    imagesRef.current = Array.from(document.querySelectorAll('.carousel-image')) as HTMLElement[]

    // 圆形轮播的半径（单位：像素）
    const radius = 242

    // 轮播进度对象，存储当前旋转进度值
    const progress = {
      value: 0 // 初始进度为0
    }
    gsap.registerPlugin(Observer)
    // 创建GSAP Observer实例监听交互事件
    Observer.create({
      // 监听目标元素
      target: carouselRef.current,

      // 监听的事件类型：鼠标滚轮和指针移动
      type: 'wheel,pointer',

      // 按下时的回调
      onPress: () => {
        // 修改鼠标样式为抓取状态
        carouselRef.current!.style.cursor = 'grabbing'
      },

      // 释放时的回调
      onRelease: () => {
        // 恢复默认鼠标样式
        carouselRef.current!.style.cursor = 'grab'
      },

      // 交互变化时的回调
      onChange: (self) => {
        // 调试用：打印Observer实例
        console.log(self, 'self')

        // 停止所有正在进行的progress动画
        gsap.killTweensOf(progress)

        // 计算进度变化量：
        // - 如果是滚轮事件，使用deltaY乘以负系数（反向滚动）
        // - 如果是指针事件，使用deltaX乘以正系数
        const p = self.event.type === 'wheel' ? self.deltaY * -0.0005 : self.deltaX * 0.05

        // 创建新的进度动画
        gsap.to(progress, {
          duration: 2, // 动画时长2秒
          ease: 'power4.out', // 使用power4缓动函数
          value: `+=${p}` // 增量更新进度值
        })
      }
    })

    // 调试用：打印获取到的图片元素
    console.log(imagesRef.current)

    // 轮播动画函数
    const animate = () => {
      // 获取图片总数（性能优化：避免每次循环都访问length属性）
      const len = imagesRef.current.length

      // 遍历所有图片元素
      imagesRef.current.forEach((image, index) => {
        // 计算当前角度（基于索引和进度）
        const theta = index / len - progress.value

        // 计算3D空间中的x/y坐标（圆形分布）
        const x = -Math.sin(theta * Math.PI * 2) * radius
        const y = Math.cos(theta * Math.PI * 2) * radius

        // 应用3D变换：
        // - x轴平移
        // - z轴深度（y值用作z轴位置）
        // - 根据角度旋转Y轴
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta}deg)`

        // 计算色相值（基于索引创建彩虹色效果）
        const c = Math.floor((index / len) * 360)

        // 设置背景色（HSLA格式：色相、90%饱和度、50%亮度、0.5透明度）
        image.style.background = `hsla(${c}, 90%, 50%, .5)`
      })
    }

    // 将动画函数添加到GSAP的全局动画队列
    gsap.ticker.add(animate)

    // 清理函数（组件卸载时执行）
    return () => {
      // 注意：这里应该移除animate和Observer，但原代码缺少这部分
      // 实际应该添加：
      // gsap.ticker.remove(animate);
      // observer.kill(); （需要先保存Observer实例）
    }
  }, []) // 空依赖数组确保只运行一次

  return (
    <div>
      <div
        ref={carouselRef}
        className="
          w-full flex justify-center items-center
          h-screen rotate--20deg -translate-y-70px
          preserve-3d perspective-800px
          select-none cursor-grab
          sm:rotate--10deg sm:scale-60 sm:-translate-y-60px
        "
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          return (
            <div
              key={i}
              className="
                carousel-image
                absolute top-1/2 left-1/2
                w-200px h-200px -mt-100px -ml-100px
                flex justify-center items-center
                text-white transform-origin-center
                translate-z--10px
              "
            >
              {i}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
